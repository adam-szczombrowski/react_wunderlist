class HomeController < ApplicationController
  def home
    @lists = List.all.includes(:tasks).where("tasks.done = ?", false)
              .references(:tasks).select(:id, :name)
              .map { |l| { list: l, tasks: l.tasks } }
  end
end
