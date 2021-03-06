import Page from './page';
import DisplayManager from '../managers/display-manager';

var displayManager = new DisplayManager();

class DisplayDemoPage extends Page {
  constructor(config) {
    super();
    this.id = config.id;
  }

  render() {
    this.$el.html(`
      <div class="row">
        <div class="col-md-5">
          <ul class="list-group">
            <li class="list-group-item">
              <a href="#" data-macro="solid-color" data-macro-config='{"color": "#ffff00"}' class="demo btn pull-right">Enable</a>
              Solid Color #ffff00
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="solid-color" data-macro-config='{"color": "#0059b2"}' class="demo btn pull-right">Enable</a>
              Solid Color #0059b2
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="solid-color" data-macro-config='{"color": "#006600"}' class="demo btn pull-right">Enable</a>
              Solid Color #006600
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="text" class="demo btn pull-right">Enable</a>
              Text (default)
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="text" data-macro-config='{"text": "RIGHT", "alignment": "right"}' class="demo btn pull-right">Enable</a>
              Text right
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="text" data-macro-config='{"text": "CENTER", "alignment": "center"}' class="demo btn pull-right">Enable</a>
              Text center
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="text" data-macro-config='{"text": "CENTER", "alignment": "center", "color": "#ffff00"}' class="demo btn pull-right">Enable</a>
              Text center, colored
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="text" data-macro-config='{"text": "LONGER MESSAGES WORK JUST FINE TOO", "color": "#ffff00"}' class="demo btn pull-right">Enable</a>
              Text long message, colored
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="text" data-macro-config='{"text": "bigger font! HEEEEY", "font": "system-16", "color": "#ffff00"}' class="demo btn pull-right">Enable</a>
              Text different font, colored
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="image" data-macro-config='{"url": "https://www.comedyfestival.co.nz/assets/Uploads/2016/Flags/_resampled/FillWyI2NCIsIjMyIl0-british-flag-small.jpg"}' class="demo btn pull-right">Enable</a>
              Image (PNG)
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="image" data-macro-config='{"url": "https://ladyenews.files.wordpress.com/2011/03/hot1.gif", "speed": "25"}' class="demo btn pull-right">Enable</a>
              Image (GIF)
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="image" data-macro-config='{"url": "https://ladyenews.files.wordpress.com/2011/03/hot1.gif", "speed": "100"}' class="demo btn pull-right">Enable</a>
              Image (GIF, slow)
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="marquee" data-macro-config='{"text": "scrolling text makes you sick", "speed": "100"}' class="demo btn pull-right">Enable</a>
              Marquee slow
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="marquee" data-macro-config='{"text": "fast text!!!", "speed": "10"}' class="demo btn pull-right">Enable</a>
              Marquee fast
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="twinkle" class="demo btn pull-right">Enable</a>
              Twinkle (default)
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="twinkle" data-macro-config='{"color": "#ff0000"}' class="demo btn pull-right">Enable</a>
              Twinkle Red
            </li>
            <li class="list-group-item">
              <a href="#" data-macro="counter" data-macro-config='{"icon": "heart", "url": "https://bigdots.io/demo/counter-example.json"}' class="demo btn pull-right">Enable</a>
              Counter
            </li>
          </ul>
        </div>
      </div>
    `);

    this.$('.demo').click((el) => {
      var $el = $(el.currentTarget);

      displayManager.update(this.id, {
        macro: $el.data('macro'),
        macroConfig: $el.data('macroConfig') || {}
      }, function() {
        console.log('updated')
      });
    });
  }
}

export { DisplayDemoPage as default }
