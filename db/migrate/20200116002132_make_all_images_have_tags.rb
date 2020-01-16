class MakeAllImagesHaveTags < ActiveRecord::Migration[5.2]
  def change
    Image.find_each do |image|
      if image.tag_list.length < 1
        image.tag_list.add('default')
        image.save
      end
    end
  end
end
