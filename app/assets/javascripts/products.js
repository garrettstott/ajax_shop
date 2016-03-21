$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';



  if(location.pathname === '/') {

    $('.home_button').on('click', function() {
      $('#products').removeClass('hidden');
      $('#show_prodct').removeClass('hidden');
      $('#show_product').addClass('hidden');
      $('#form_div').removeClass('hidden');
      $('#form_div').addClass('hidden');
      getProducts();
    });

    function getProducts(data) {
      $('#products').html('');
      $('#show_prouct').html('');
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
        url: baseUrl + '/' + this.dataset.id,
        success: function(data){
          var product = data.product;
          var description = product.description ? product.description : 'Coming Soon';
          var price = product.base_price ? product.base_price : '0.00';
          $('#product_name').append(product.name);
          $('#product_description').append(description);
          $('#product_price').append('$' + price);
          $('#delete').attr('data-id', product.id);
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
        url: baseUrl + '/' + this.dataset.id,
        type: 'DELETE',
        success: function() {
          alert('Deleted');
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
      $('#products').addClass('hidden');
      $('#form_div').removeClass('hidden');
    });
      
    $('#new_product_form').on('submit', function(e){
      e.preventDefault();
      $.ajax({
        url: baseUrl + '/',
        type: 'POST',
        dataType: 'JSON',
        data: $(this).serializeArray(),
        successs: function(data) {
          $('#form_div').addClass('hidden');
          $('#products').removeClass('hidden');
          $('#products').html('');
          location.href = '/'
        },
        error: function(error) {
          console.log(error);
        }
      });
      getProducts();
    });




    getProducts();
  }


  

















});