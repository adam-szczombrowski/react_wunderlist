class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tasks = List.find(params[:list_id]).tasks.where(done: false)
    render json: tasks
  end

  def create
    task = Task.create(task_params)
    render json: task
  end

  def check
    task = Task.find(params[:id])
    task.update(done: true)
    render json: task
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    render json: task
  end

  private

  def task_params
    params.require(:task).permit(:list_id, :name)
  end
end
