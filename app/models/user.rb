class User < ApplicationRecord
    has_many :meals
  
    has_secure_password
  
    validates :username, presence: true, uniqueness: true
end
