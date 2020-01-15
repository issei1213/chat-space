# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|varchar(100)|null: false, unique: true, add_index|
|email|varchar(255)|null: false, unique: true|
|password|varchar(255)|null: false, unique: true|
### Association
- has_many :groups, through: :users_groups
- has_many :chats

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|varchar(100)|null: false, foreign_key: true, add_index|
### Association
- has_many :users through: :users_groups
- has_many :chats

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|body|text|null: false|
|image|mediumblob||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
