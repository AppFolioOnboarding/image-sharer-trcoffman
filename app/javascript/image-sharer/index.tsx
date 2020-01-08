import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, useHistory, useParams, Switch } from 'react-router-dom';
import { SpraypaintBase, Model, Attr } from 'spraypaint';

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
};


const Home = () => {
  return <Fragment>
      <h1>Image Sharer Ultra</h1>
      <Link to='/images/new'>Add new image</Link>
      <ImageIndex />
    </Fragment>;
};

const SaveImage = () => {
  const [ url, setUrl ] = useState('default');
  const [ response, setResponse ] = useState(null);
  const [ fetchError, setFetchError ] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const image = new Image({ url });
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
      <h1>Save an Image Link</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='url'>
          {response && response.errors.url && <span>{response.errors.url.fullMessage}<br/></span>}
          {fetchError && <ul><li>{fetchError.toString()}</li></ul>}
        </label>
        <input name='url' id='url' type='text' value={url} onChange={e => setUrl(e.target.value)} />
        <input type='submit' value='Submit'/>
      </form>
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
    <div>
      <aside>
      </aside>
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/images/new' component={SaveImage} />
          <Route path='/images/:id' component={ShowImage} />
        </Switch>
      </main>
    </div>
  </Router>;
};

const Wut = () => {
  return <Home />;
}

console.log("Hello, React!");
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div')),
  )
});
