module("luci.controller.tinyproxy", package.seeall)

function index()
	if not nixio.fs.access("/etc/config/tinyproxy") then
		return
	end

	entry({"admin", "services", "tinyproxy"}, alias("admin", "services", "tinyproxy", "instances"),
		_("Tinyproxy"), 60).dependent = false
	entry({"admin", "services", "tinyproxy", "instances"}, cbi("tinyproxy"),
		_("Proxy instances"), 1)
	entry({"admin", "services", "tinyproxy", "diagnostics"}, call("action_diagnostics"),
		_("Diagnostics"), 2)
end

function action_diagnostics()
	local http = require "luci.http"
	local sys = require "luci.sys"
	local command = "/usr/sbin/tinyproxy-diagnose"
	local output

	if http.getenv("REQUEST_METHOD") == "POST" and http.formvalue("repair") == "1" then
		output = sys.exec(command .. " --fix 2>&1")
	else
		output = sys.exec(command .. " 2>&1")
	end

	luci.template.render("tinyproxy/diagnostics", { output = output })
end
