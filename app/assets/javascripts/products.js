$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';

  if(location.pathname === '/') {
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
        url: baseUrl + '/' + this.dataset.id,
        success: function(data){
          var product = data.product;
          var description = product.description ? product.description : 'Coming Soon';
          var price = product.base_price ? product.base_price : '0.00';
          $('#product_name').append(product.name);
          $('#product_description').append(description);
          $('#product_price').append(price);
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
      

  }


  

















});