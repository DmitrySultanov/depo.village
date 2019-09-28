$(document).ready(function(){

	$.validator.addMethod('phoneCheck', function(value, element, params){
	var length = $(element).inputmask('unmaskedvalue').length;
	return (length < 10 && length > 0) ? false : true;
	}, 'Введите полный номер');

	$.validator.addMethod("email", function(value, element) {
	  return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:\S{1,63})$/.test( value );
	}, 'Введите корректную почту');

	// Валидация
	$('.form-validate').each(function(){
		var $this = $(this);
        var $successModal =  $this.siblings('.success');
        // var $errorModal =  $('.sended-modal.error');

		// Валидация формы
		$this.validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				search: {
					required: true,
					minlength: 3
				},
				proxy_password: {
					required: true,
					minlength: 4
				},
				password: {
					required: true,
					minlength: 4
				},
				confirm_password: {
					required: true,
					minlength: 4,
					equalTo: "#password"
				},
			},
			messages: {
				name: {
					minlength: "Введите имя полностью"
				},
				password: {
					required: "Введите пароль",
					minlength: ""
				},
				proxy_password: {
					required: "Введите пароль",
					minlength: ""
				},
				confirm_password: {
					required: "Повторите пароль",
					minlength: "Пароль не может содержать менее 5 символов",
					equalTo: "Введенные пароли не совпадают"
				},
			}
		});
				
		$.validator.addClassRules({
		  	phone: {
		    	required: true,
		    	phoneCheck: true
		  	}
		});

		$.validator.addClassRules({
		  	laxEmail: {
		    	required: true,
		  	}
		});

		$this.submit(function(){

			if($this.valid()){
				$this.addClass('d-none');
				$successModal.removeClass('d-none');

				setTimeout(function(){
					$this.find('input, textarea').removeClass('error');
					$this.trigger('reset');
				}, 200);
			}
		});
	});
});




