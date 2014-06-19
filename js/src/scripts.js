var SITE = {
	init: function() {
		this.setVars();
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
		this.$uploadedFile.attr('src', '/images/' + filename);
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