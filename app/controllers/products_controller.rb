class ProductsController < ApplicationController
  def index
  end

  def new
  end

  def edit
  end

  def show_user
    @product = params[:product]
    @description = @product[:description]
    render(partial: 'show_product')
  end

  def product_card
    @product = params[:product]
    render(partial: 'product_card')
  end
end
