class ListsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    list = List.create(list_params)
    render json: list
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end
end
