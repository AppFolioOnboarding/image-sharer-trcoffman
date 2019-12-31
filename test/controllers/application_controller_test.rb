require 'test_helper'

class ApplicationControllerTest < ActionDispatch::IntegrationTest
  test 'root loads' do
    get root_url
    assert_response :success
  end
end
