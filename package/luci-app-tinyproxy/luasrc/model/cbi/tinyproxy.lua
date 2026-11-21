local m, s, enabled, port, listen, allow, timeout, clients

m = Map("tinyproxy", translate("Tinyproxy"),
	translate("Create and manage isolated proxy instances. New instances listen on loopback only unless you explicitly add trusted addresses."))

s = m:section(TypedSection, "tinyproxy", translate("Proxy instances"))
s.addremove = true
s.anonymous = false
s.template = "cbi/tblsection"

enabled = s:option(Flag, "enabled", translate("Enabled"))
enabled.rmempty = false
enabled.default = "0"

port = s:option(Value, "port", translate("Port"))
port.datatype = "port"
port.default = "8888"
port.rmempty = false

listen = s:option(Value, "listen", translate("Additional listen address"))
listen.datatype = "ipaddr"
listen.placeholder = "127.0.0.1"
listen.rmempty = true

allow = s:option(DynamicList, "allow", translate("Allowed client addresses"))
allow.description = translate("IP addresses, CIDR ranges, or host names allowed to use this proxy.")
allow:value("127.0.0.1")
allow:value("::1")

timeout = s:option(Value, "timeout", translate("Timeout (seconds)"))
timeout.datatype = "range(1,86400)"
timeout.default = "600"
timeout.rmempty = false

clients = s:option(Value, "max_clients", translate("Maximum clients"))
clients.datatype = "range(1,10000)"
clients.default = "100"
clients.rmempty = false

return m
