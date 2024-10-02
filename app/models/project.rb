class Project < ApplicationRecord
  belongs_to :resume

   validates :title, presence: true
  validates :description, presence: true
  validates :url, presence: true, format: { with: URI.regexp(%w[http https]) }
end
