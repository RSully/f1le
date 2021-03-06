(function() {
  
  function BaseCircle() {
    this.border = $('#circle-border')[0];
    this.circle = $('#circle');
    this.bottomButton = $('#files-link');
    $(window).resize(this.resize.bind(this));
    this.resize();
  }
  
  BaseCircle.prototype.borderThickness = function() {
    var size = this.border.width;
    var scale = this.border.width / $(this.border).width();
    return 10*scale*(size/500);
  }
  
  BaseCircle.prototype.draw = function() {
    var ctx = this.border.getContext('2d');
    var size = this.border.width;    
    var thickness = this.borderThickness();
    
    ctx.clearRect(0, 0, size, size);
    
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2-thickness/2, 0, 2*Math.PI, false);
    ctx.lineWidth = thickness;
    ctx.fillStyle = 'rgba(101, 188, 212, 0.8)';
    ctx.fill();
    ctx.strokeStyle = '#d7d7d7';
    ctx.stroke()
  };
  
  BaseCircle.prototype.resize = function() {
    var buttonSize = 100;
    if ($(window).height() < 600) {
      buttonSize *= $(window).height()/600;
      buttonSize = Math.round(Math.max(buttonSize, 1));
    }
    var mainHeight = $(window).height() - (buttonSize+20);
    var smallerDim = Math.min($(window).width(), mainHeight);
    var size = Math.max(Math.min(smallerDim-40, 500), 1);
    
    var circleTop = (mainHeight-size) / 2;
    var circleLeft = ($(window).width()-size) / 2;
    this.circle.css({width: size, height: size, top: circleTop,
      left: circleLeft, "font-size": size/20});
    
    var buttonLeft = ($(window).width()-buttonSize) / 2;
    this.bottomButton.css({width: buttonSize, height: buttonSize, bottom: 20,
      left: buttonLeft});
    
    this.border.width = size;
    this.border.height = size;
    this.draw();
  };
  
  if (!window.app) {
    window.app = {};
  }
  window.app.BaseCircle = BaseCircle;
  
})();