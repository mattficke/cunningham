class UsersController < ApplicationController
  skip_before_action :authenticate
  def sign_up
  end

  def sign_up!
    user = User.new(
      username: params[:username],
      password_digest: BCrypt::Password.create(params[:password])
    )
    if user.save
      message = "Your account has been created!"
      flash[:notice] = message
      redirect_to action: :sign_in
    else
      message = "Your account couldn't be created. Did you enter a unique username and password?"
      flash[:notice] = message
      redirect_to action: :sign_up
    end
  end

  def sign_in
  end

  def sign_in!
    @user = User.find_by(username: params[:username])
    if !@user
      message = "This user doesn't exist!"
    elsif !BCrypt::Password.new(@user.password_digest).is_password?(params[:password])
      message = "Your password's wrong!"
    else
      message = "You're signed in, #{@user.username}!"
      cookies[:username] = {
        value: @user.username,
        expires: 100.years.from_now
      }
      session[:user] = @user
      redirect_to root_url and return
    end
    flash[:notice] = message
    redirect_to action: :sign_in
  end

  def sign_out
    flash[:notice] = "You're signed out!"
    reset_session
    redirect_to root_url
end
end
