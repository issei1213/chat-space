class GroupsController < ApplicationController

  def index
  end

  def new                             #グループの新規登録・フォームの表示
    @group = Group.new                #空のインスタンス変数作成(form_forで使用する)
    @group.users << current_user      #配列に要素追加
  end

  def create                          #グループの新規登録・TB更新
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成されました。'
    else
      render :new
    end
  end

  def edit                            #グループの編集・フォームの表示
    @group = Group.find(params[:id])
  end

  def update                          #グループの編集・TB更新
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを更新しました。'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

end
