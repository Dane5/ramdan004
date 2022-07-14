class MealSerializer < ActiveModel::Serializer
  attributes :id, :title, :directions, :prep_time
  belongs_to :user
end
