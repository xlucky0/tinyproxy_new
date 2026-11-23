'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m, s, o;

		m = new form.Map('tinyproxy', _('Tinyproxy'),
			_('Create and manage isolated proxy instances. New instances listen on loopback only unless you explicitly add trusted addresses.'));

		s = m.section(form.GridSection, 'tinyproxy', _('Proxy instances'));
		s.addremove = true;
		s.anonymous = false;
		s.sortable = false;
		s.nodescriptions = true;

		o = s.option(form.Flag, 'enabled', _('Enabled'));
		o.default = '0';
		o.rmempty = false;

		o = s.option(form.Value, 'port', _('Port'));
		o.datatype = 'port';
		o.default = '8888';
		o.rmempty = false;

		o = s.option(form.Value, 'listen', _('Additional listen address'));
		o.datatype = 'ipaddr("nomask")';
		o.placeholder = '127.0.0.1';
		o.rmempty = true;

		o = s.option(form.Value, 'bind', _('Outgoing bind address'));
		o.datatype = 'ipaddr("nomask")';
		o.description = _('Optional. Source address used for outgoing connections. Must be assigned to this router.');
		o.rmempty = true;

		o = s.option(form.DynamicList, 'allow', _('Allowed client addresses'));
		o.datatype = 'or(ipaddr, hostname)';
		o.description = _('IP addresses, CIDR ranges, or host names allowed to use this proxy.');
		o.value('127.0.0.1');
		o.value('::1');
		o.modalonly = true;

		o = s.option(form.Value, 'timeout', _('Timeout (seconds)'));
		o.datatype = 'range(1,86400)';
		o.default = '600';
		o.rmempty = false;
		o.modalonly = true;

		o = s.option(form.Value, 'max_clients', _('Maximum clients'));
		o.datatype = 'range(1,10000)';
		o.default = '100';
		o.rmempty = false;
		o.modalonly = true;

		return m.render();
	}
});
