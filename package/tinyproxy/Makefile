include $(TOPDIR)/rules.mk

PKG_NAME:=tinyproxy
PKG_VERSION:=1.11.3
PKG_RELEASE:=2

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.xz
PKG_SOURCE_URL:=https://github.com/tinyproxy/tinyproxy/releases/download/$(PKG_VERSION)
PKG_HASH:=f05644fdf1211ba13754a354bebed909b5b39371b12cce8563c46929a75bedf6

PKG_MAINTAINER:=xlucky0
PKG_LICENSE:=GPL-2.0-or-later
PKG_LICENSE_FILES:=COPYING
PKG_INSTALL:=1
PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk

define Package/tinyproxy
  SECTION:=net
  CATEGORY:=Network
  SUBMENU:=Web Servers/Proxies
  TITLE:=Lightweight HTTP and HTTPS proxy
  URL:=https://tinyproxy.github.io/
endef

define Package/tinyproxy/conffiles
/etc/config/tinyproxy
endef

define Package/tinyproxy/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	# migrate option names from the stock OpenWrt package (Port, Listen, ...)
	# to the lowercase names used by this package; harmless if already done
	for section in $$(uci -q show tinyproxy | sed -n "s/^tinyproxy\.\([^.=]*\)=tinyproxy$$/\1/p"); do
		for pair in Port:port Listen:listen Bind:bind Allow:allow Timeout:timeout MaxClients:max_clients; do
			old="$${pair%%:*}"
			new="$${pair##*:}"
			uci -q get "tinyproxy.$$section.$$old" >/dev/null || continue
			uci -q get "tinyproxy.$$section.$$new" >/dev/null && continue
			uci -q rename "tinyproxy.$$section.$$old=$$new"
		done
	done
	uci -q commit tinyproxy
	rm -f /tmp/luci-indexcache* 2>/dev/null
	rm -rf /tmp/luci-modulecache 2>/dev/null
	/etc/init.d/tinyproxy enable
	/etc/init.d/tinyproxy restart
}
endef

CONFIGURE_VARS += ac_cv_path_A2X=no

define Package/tinyproxy/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/usr/bin/tinyproxy $(1)/usr/bin/
	$(INSTALL_DIR) $(1)/usr/share/tinyproxy
	$(CP) $(PKG_INSTALL_DIR)/usr/share/tinyproxy/*.html $(1)/usr/share/tinyproxy/
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/tinyproxy.config $(1)/etc/config/tinyproxy
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/tinyproxy.init $(1)/etc/init.d/tinyproxy
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) ./files/tinyproxy-diagnose $(1)/usr/sbin/
endef

$(eval $(call BuildPackage,tinyproxy))
