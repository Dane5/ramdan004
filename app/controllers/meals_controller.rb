class MealsController < ApplicationController
    def index
        render json: Meal.all
      end
    
      def create
        meal = @current_user.meals.create!(meal_params)
        render json: meal, status: :created
      end
    
      private
    
      def meal_params
        params.permit(:title, :directions, :prep_time)
      end
end
