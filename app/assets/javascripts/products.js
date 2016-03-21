$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products/';

    $(document).on('click', '.home_page_button', function(e) {
      e.preventDefault();
      $('#products').removeClass('hidden');
      $('#products').addClass('hidden');
      $('#show_product').removeClass('hidden');
      $('#show_product').addClass('hidden');
      $('#form_div').removeClass('hidden');
      $('#form_div').addClass('hidden');
      $('#home_page').removeClass('hidden');
    });

    $(document).on('click', '.shop_now_button', function(e) {
      e.preventDefault();
      $('#product_name').html('');
      $('#product_description').html('');
      $('#product_price').html('');
      $('#products').removeClass('hidden');
      $('#show_product').removeClass('hiddnen');
      $('#show_product').addClass('hidden');
      $('#form_div').removeClass('hidden');
      $('#form_div').addClass('hidden');
      $('#home_page').removeClass('hidden');
      $('#home_page').addClass('hidden');
    });

    function getProducts(data) {
      $('#products').html('');
      $.ajax({
        url: baseUrl,
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
          var products = data.products;
          for( var i = 0; i < products.length; i++) {
            var product = products[i];
            productCard(product);
          }
        },
        error: function(data) {
          console.log(data);
        }
      });
    }

    function productCard(product) {
      $.ajax({
        url: 'product_card',
        type: 'GET',
        data: {product: product},
        success: function(data) {
          $('#products').append(data);
        },
        error: function(data) {
          console.log(data);
        }
      });
    }

    $(document).on('click', '#buy', function(e) {
      e.preventDefault();
      var showProduct = $('#show_product');
      $.ajax({
        type: 'GET',
        url: baseUrl + this.dataset.id,
        success: function(data){
          var product = data.product;
          var description = product.description ? product.description : 'Coming Soon';
          var price = product.base_price ? product.base_price : 'Not Listed';
          $('#product_name').append(product.name);
          $('#product_description').append(description);
          $('#product_price').append('$ ' + price);
          $('#delete').attr('data-id', product.id);
          $('#edit').attr('data-id', product.id);
          showProduct.removeClass('hidden');
          $('#products').addClass('hidden');
        },
        error: function(data) {
          console.log(data);
        }
      });
    });

    $(document).on('click', '#back_button', function(e) {
      e.preventDefault();
      $('#product_name').html('');
      $('#product_description').html('');
      $('#product_price').html('');
      $('#show_product').addClass('hidden');
      $('#products').removeClass('hidden');
    });

    $(document).on('click', '#delete', function() {
      $.ajax({
        url: baseUrl + this.dataset.id,
        type: 'DELETE',
        success: function() {
          confirm('Are you sure?');
          $('#product_name').html('');
          $('#product_description').html('');
          $('#product_price').html('');
          $('#show_product').addClass('hidden');
          $('#products').removeClass('hidden');
          $('#products').html('');
        },
        error: function(erorr) {
          console.log(error);
        }
      });
      getProducts();
    });

    $(document).on('click', '#new_product', function(e){
      e.preventDefault();
      var form = $('#new_product_form');
      form.find('#form_name').html('New Product');
      form.find("#product_name").val('');
      form.find('#product_description').val('');
      form.find('#product_price').val('');
      $('#product_price').val('');
      $('#home_page').removeClass('hidden');
      $('#home_page').addClass('hidden');
      $('#products').addClass('hidden');
      $('#show_product').addClass('hidden');
      $('#form_div').removeClass('hidden');
    });
      
    $('#new_product_form').on('submit', function(e){
      e.preventDefault();
      $.ajax({
        url: baseUrl,
        type: 'POST',
        dataType: 'JSON',
        data: $(this).serializeArray(),
        successs: function(data) {
          location.href = '/'
        },
        error: function(error) {
          console.log(error);
        }
      });
        newForm = $('#new_product_form');
        newForm.find('#product_name').val('');
        newForm.find('#product_description').val('');
        newForm.find('#product_name').val('');
        $('#form_div').addClass('hidden');
        $('#products').removeClass('hidden');
      getProducts();
    });

    $('#edit').on('click', function() {
      $.ajax({
        url: baseUrl + this.dataset.id,
        type: 'GET',
        success: function(data) {
          $('#show_product').addClass('hidden');
          $('#form_div').removeClass('hidden');
          var product = data.product;
          var editForm = $('#new_product_form');
          editForm.find('#form_name').html("Edit Product");
          editForm.find('#product_name').val(product.name);
          editForm.find('#product_description').val(product.description);
          editForm.find('#product_price').val(product.base_price);
        },
        error: function(error) {
          console.log(error);
        }
      });
    });

    getProducts();
});