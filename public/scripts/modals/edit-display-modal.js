import page from 'page';
import Modal from './modal';
import DisplayManager from '../managers/display-manager';
import MacroManager from '../managers/macro-manager';

var macroManager = new MacroManager(),
    displayManager = new DisplayManager();

class EditDisplayModal extends Modal {
  constructor($el, displayKey, displayData) {
    super($el);
    this.displayKey = displayKey;
    this.displayData = displayData;
  }

  render() {
    this.$el.html(`
      <div id="edit-display" class="modal fade">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">Edit Display</h4>
            </div>
            <div class="modal-body">
              <form>
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#edit-general">General</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#edit-owners">Owners</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#edit-macro">Macro</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <br />
                  <div id="edit-general" class="tab-pane active">
                    <div class="row">
                      <div class="col-xs-12">
                        <fieldset class="form-group">
                          <label for="display-name">Display name</label>
                          <input type="name" name="display-name" class="form-control" id="display-name" />
                        </fieldset>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-6">
                        <fieldset class="form-group">
                          <label for="display-width">Select width</label>
                          <select class="form-control" id="display-width" name="width">
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                            <option value="96">96</option>
                            <option value="128">128</option>
                          </select>
                        </fieldset>
                      </div>
                      <div class="col-xs-12 col-sm-6">
                        <fieldset class="form-group">
                          <label for="display-height">Select height</label>
                          <select class="form-control" id="display-height" name="height">
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                            <option value="96">96</option>
                            <option value="128">128</option>
                          </select>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div id="edit-owners" class="tab-pane">
                    <ul id="display-owners" class="list-group"></ul>
                  </div>
                  <div id="edit-macro" class="tab-pane">
                    <div class="row">
                      <div class="col-xs-12">
                        <fieldset class="form-group">
                          <label for="macro">Select macro</label>
                          <select name="macro" class="form-control" id="macro"></select>
                        </fieldset>
                      </div>
                    </div>
                    <div class="programmable options row" style="display: none;">
                      <div class="col-xs-12">
                        <p class="programmable description"></p>
                        <p>Warning you need programming skills to use this display macro. Learn more about this option <a href="#">here.</a>
                      </div>
                    </div>
                    <div class="twinkle options row" style="display: none;">
                      <div class="col-xs-12">
                        <p class="twinkle description"></p>
                        <fieldset class="form-group">
                          <h5>Macro options</h5>
                          <label for="twinkle-base-color">Seed Color</label>
                          <div class="input-group colorpicker-component">
                            <input type="text" id="twinkle-seed-color" value="#006e91" class="form-control" />
                            <span class="input-group-addon"><i></i></span>
                          </div>
                          <small class="text-muted">The brightest hex value you want to display</small>
                        </fieldset>
                      </div>
                    </div>
                    <div class="solid-color options row" style="display: none;">
                      <div class="col-xs-12">
                        <p class="solid-color description"></p>
                        <fieldset class="form-group">
                          <h5>Macro options</h5>
                          <label for="solid-color">Color</label>
                          <div class="input-group colorpicker-component">
                            <input type="text" id="solid-color" value="#006e91" class="form-control" />
                            <span class="input-group-addon"><i></i></span>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
                <br /><br />
                <button type="submit" class="btn btn-success">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `);

    this.populateMacros();
    this.populateOwners();

    this.$('#edit-display').on('show.bs.modal', () => {
      this.$('select#macro').val(this.displayData.macro).change();
      this.$('select#display-width').val(this.displayData.width).change();
      this.$('select#display-height').val(this.displayData.height).change();
    });
    this.$('#display-name').val(this.displayData.name)

    this.$('#edit-display').on('shown.bs.modal', () => {
      $('select').select2();
    });
    this.$('a[data-toggle="tab"]').on('shown.bs.tab', () => {
      $('select').select2();
    });

    this.$('.colorpicker-component').colorpicker();

    var $twinkleOptions = this.$('.options.twinkle'),
        $programmableOptions = this.$('.options.programmable'),
        $solidColorOptions = this.$('.options.solid-color');

    this.$('select#macro').change(function(el) {
      $twinkleOptions.hide();
      $programmableOptions.hide();
      $solidColorOptions.hide();

      if(this.value === 'twinkle') {
        $twinkleOptions.show();
      } else if(this.value == 'programmable') {
        $programmableOptions.show();
      } else if(this.value == 'solid-color') {
        $solidColorOptions.show();
      }
    });

    this.$('form').submit((ev) => {
      ev.preventDefault();

      var newData = {
        macro: this.$('select#macro').val(),
        name: this.$('#display-name').val(),
      };

      if(newData.macro === 'twinkle') {
        newData.macroConfig = {seedColor: this.$('#twinkle-seed-color').val() };
      } else if(macro === 'solid-color') {
        newData.macroConfig = {color: this.$('#solid-color').val() };
      }

      displayManager.update(this.displayKey, newData, (displayKey) => {
        this.$('#edit-display').modal('hide');

        // Why doesn't this happen automatically?!
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        page(`/displays/${this.displayKey}`);
      });
    });
  }

  populateMacros() {
    var $macrosSelect = this.$('select#macro');
    macroManager.getInstalledMacros((macros) => {
      for(let key in macros) {
        $macrosSelect.append(`<option value=${key}>${macros[key].name}</option>`);
        this.$(`.description.${key}`).text(macros[key].description);
      }
    });
  }

  populateOwners() {
    displayManager.getOwners(this.displayKey, (userskeys, users) => {
      var $displayOwners = this.$('#display-owners');
      users.forEach(function(user) {
        $displayOwners.append(`
          <li class="list-group-item">
            <img src="${user.profileImageUrl}" style="width: 40px; height: 40px; border-radius: 20px;" />
            ${user.name}
          </li>
        `);
      });
    });
  }
}

export { EditDisplayModal as default }