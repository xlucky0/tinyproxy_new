'use strict';
'require view';
'require fs';
'require ui';

var DIAG = '/usr/sbin/tinyproxy-diagnose';

function runDiag(args) {
	return fs.exec(DIAG, args).then(function(res) {
		return ((res.stdout || '') + (res.stderr || '')).trim();
	});
}

return view.extend({
	load: function() {
		return runDiag([]).catch(function(err) {
			return _('Unable to run diagnostics: %s').format(err.message || err);
		});
	},

	handleRepair: function(output, ev) {
		ev.target.disabled = true;
		return runDiag([ '--fix' ]).then(function(text) {
			output.textContent = text;
			ui.addNotification(null, E('p', _('Diagnose and repair finished.')), 'info');
		}).catch(function(err) {
			ui.addNotification(null, E('p', _('Repair failed: %s').format(err.message || err)), 'danger');
		}).finally(function() {
			ev.target.disabled = false;
		});
	},

	render: function(text) {
		var output = E('pre', {}, text);

		return E([
			E('h2', _('Tinyproxy diagnostics')),
			E('p', _('Diagnostics identify invalid settings and duplicate ports. Repair changes only invalid numeric values and conflicting ports, then regenerates runtime configuration.')),
			output,
			E('div', { 'class': 'cbi-page-actions' }, [
				E('button', {
					'class': 'btn cbi-button cbi-button-action',
					'click': ui.createHandlerFn(this, 'handleRepair', output)
				}, _('Diagnose and repair'))
			])
		]);
	},

	handleSave: null,
	handleSaveApply: null,
	handleReset: null
});
