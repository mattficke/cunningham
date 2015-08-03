class User < ActiveRecord::Base
  has_many :feeds
end
