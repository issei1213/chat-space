## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, add_index|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
### Association
- has_many :groups, through: :users_groups
- has_many :users_groups
- has_many :chats

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
### Association
- has_many :users through: :users_groups
- has_many :users_groups
- has_many :chats

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
