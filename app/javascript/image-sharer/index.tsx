import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, useHistory, useParams, Switch } from 'react-router-dom';
import { SpraypaintBase, Model, Attr } from 'spraypaint';
import { BoundForm, BoundFormRow, Button, Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Col, } from 'react-gears';

@Model()
class ApplicationRecord extends SpraypaintBase {
  static baseUrl = 'http://localhost:3000';
  static apiNamespace = '/api';
};

@Model()
class Image extends ApplicationRecord {
  static jsonapiType = 'image';
  static endpoint = '/images';

  @Attr() url: string;
  @Attr() tagList: string[];
};


const Home = () => {
  return <Fragment>
      <ImageIndex />
    </Fragment>;
};

const SaveImage = () => {
  const [ url, setUrl ] = useState('');
  const [ rawTags, setRawTags ] = useState('');
  const [ response, setResponse ] = useState(null);
  const [ fetchError, setFetchError ] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tag_list = rawTags
      .split(' ')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    try {
      const image = new Image({ url, tag_list });
      await image.save();
      setResponse(image);
    } catch (e) {
      setFetchError(e);
    }
  };
  if (response && response.id) {
    history.push(`/images/${response.id}`);
  }
  return <Fragment>
    <Row></Row>
    <h1>Add Image</h1>
    <BoundForm
      errors={{
        url: response && response.errors && response.errors.url && response.errors.url.fullMessage,
        tags: response && response.errors && response.errors.tags && response.errors.tags.fullMessage,
      }}
      object={{
        url: '',
        tags: '',
      }}
      onSubmit={handleSubmit}>
      <Row>
        <Col>
          <BoundFormRow
            label='URL'
            name='url'
            onChange={e => setUrl(e.target.value)}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <BoundFormRow
            label='Tags'
            name='tags'
            onChange={e => setRawTags(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={{size: 'auto', offset: 3}}>
          <Button>Submit</Button>
        </Col>
      </Row>
    </BoundForm>
  </Fragment>;
};

const ShowImage = () => {
  const { id } = useParams();
  const [ image, setImage ] = useState(null);
  useEffect(() => {
    Image.find(id).then(setImage);
  }, []);

  if (image === null) {
    return <p>Loading...</p>;
  }

  return <img style={{maxWidth: '100%'}} src={image.data.url} />;
};

const ImageIndex = () => {
  const [ images, setImages ] = useState(null);
  useEffect(() => {
    Image.all().then(setImages);
  }, []);

  if (images === null) {
    return <p>Loading...</p>;
  }

  return <Fragment>
    <div className="my-container">
      <div className="my-grid-row">
        {[...images.data].reverse().map(image => (
          <div className='my-grid-item'>
            <Link to={`/images/${image.id}`}>
              <img src={image.url} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </Fragment>;
};

const Root = () => {

  return <Router>
    <Navbar
      color='primary'
      dark
      expand='md'
      fixed={undefined}
      tag='nav'
    >
      <NavbarBrand
        tag='span'
      >
        <Link className='navbar-brand' to='/'>
          Image Sharer Ultra
        </Link>
      </NavbarBrand>
      <Nav
        justified={true}
        navbar
        className='ml-auto'
      >
        <NavItem>
          <Link className='nav-link' to='/images/new'>Add Image</Link>
        </NavItem>
      </Nav>
    </Navbar>
    <Container
      className='text-xs-center'
      fluid
      tag='div'
    >
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/images/new' component={SaveImage} />
          <Route path='/images/:id' component={ShowImage} />
        </Switch>
      </main>
    </Container>
  </Router>;
};

console.log("Hello, React!");
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div')),
  )
});
