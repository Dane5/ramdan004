class Meal < ApplicationRecord
    belongs_to :user

    validates :title, presence: true
    validates :directions, length: { minimum: 30 }
end
