var SITE = {
	init: function() {
		this.setVars();
		this.setTemplates();
		this.bindEvents();
	},

	setVars: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		this.$shownPhotoInput = $('#photo-input-shown');
		this.$hiddenPhotoInput = $('#photo-input-hidden');
		this.$submitPhotoBtn = $('#photo-submit');
		this.$photoForm = $('#photo-form');
		this.$uploadedFilename = $('#uploaded-filename');
		this.$uploadedFile = $('#uploaded-file');
	},

	setTemplates: function() {
		this.imageElem = '<img src="">';
		this.pdfElem = '<object data="" type="application/pdf"></object>';
	},

	bindEvents: function() {
		this.$shownPhotoInput.on('click', this.triggerHiddenPhotoInput.bind(this));
		this.$hiddenPhotoInput.on('change', this.uploadInput.bind(this));
		this.$submitPhotoBtn.on('click', this.triggerSubmission.bind(this));
		this.$photoForm.on('submit', this.submitFile.bind(this));
	},

	triggerHiddenPhotoInput: function(e) {
		this.$hiddenPhotoInput.trigger('click');
	},

	uploadInput: function(e) {
		var filepath = this.$hiddenPhotoInput.val();
		var filename = filepath.split("\\");
		filename = filename[filename.length-1];
		
		this.$uploadedFilename.html(filename);
		//this.$uploadedFile.attr('src', 'images/' + filename);

		var fReader = new FileReader();
		var file = this.$hiddenPhotoInput[0].files[0];
		fReader.readAsDataURL(file);
		var context = this;

		//console.log(file.type);

		fReader.onloadend = function(event){
			var result = event.target.result;
			
			var imageType = 'image/*';
			var pdfType = 'application/pdf';
			var mswordType = 'application/msword';

			if (file.type.match(imageType)) {
				context.$uploadedFile.html(context.imageElem);
				context.$uploadedFile.find('img').attr('src', result);
			} else if (file.type.match(pdfType)) {
				context.$uploadedFile.html(context.pdfElem);
				context.$uploadedFile.find('object').attr('data', result);
			} else if (file.type.match(mswordType)) {
				context.$uploadedFile.html('');
				console.log('word doc!');
			} else{
				context.$uploadedFile.html('');
				console.log('not image or pdf file!');
			}
		}


		e.preventDefault();
	},

	triggerSubmission: function(e) {
		this.$photoForm.submit();
	},

	submitFile: function(e) {
		var submission = this.$hiddenPhotoInput.val();
		if (submission.length > 0) {
			alert('Fake submission of: ' + this.$hiddenPhotoInput.val());
		} else {
			alert('Upload something!');
		}
		
	}


}

SITE.init();