# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

(1..5).each do |n|
  List.create(name: "list#{n}")
end

List.all.each do |l|
  (1..5).each do |n|
    Task.create(name: "Task #{n} of list #{l.id}", list: l)
  end
end
