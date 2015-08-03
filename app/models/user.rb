class User < ActiveRecord::based
  has_many :feeds
end
