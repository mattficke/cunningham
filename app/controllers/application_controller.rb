class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate

  private
  def authenticate
    if !session[:user]
      redirect_to '/sign_in'
    end
  end

  def get_query_strings
    url = URI.parse(request.original_url)
    query = CGI.parse(url.query)
    return query
  end
end
