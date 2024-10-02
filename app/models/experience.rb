class Experience < ApplicationRecord
  belongs_to :resume


  validates :job_title, presence: true
  validates :company, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :description, presence: true
end
