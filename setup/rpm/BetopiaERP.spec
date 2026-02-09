%global name BetopiaERP
%global unmangled_version %{version}
%global __requires_exclude ^.*BetopiaERP/addons/mail/static/scripts/BetopiaERP-mailgate.py$

Summary: BetopiaERP Server
Name: %{name}
Version: %{version}
Release: %{release}
Source0: %{name}-%{unmangled_version}.tar.gz
License: LGPL-3
Group: Development/Libraries
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-buildroot
Prefix: %{_prefix}
BuildArch: noarch
Vendor: BetopiaERP S.A. <info@BetopiaERP.com>
Requires: sassc
BuildRequires: python3-devel
BuildRequires: pyproject-rpm-macros
Url: https://www.BetopiaERP.com

%description
BetopiaERP is a complete ERP and CRM. The main features are accounting (analytic
and financial), stock management, sales and purchases management, tasks
automation, marketing campaigns, help desk, POS, etc. Technical features include
a distributed server, an object database, a dynamic GUI,
customizable reports, and XML-RPC interfaces.

%generate_buildrequires
%pyproject_buildrequires

%prep
%autosetup

%build
%py3_build

%install
%py3_install

%post
#!/bin/sh

set -e

BetopiaERP_CONFIGURATION_DIR=/etc/BetopiaERP
BetopiaERP_CONFIGURATION_FILE=$BetopiaERP_CONFIGURATION_DIR/BetopiaERP.conf
BetopiaERP_DATA_DIR=/var/lib/BetopiaERP
BetopiaERP_GROUP="BetopiaERP"
BetopiaERP_LOG_DIR=/var/log/BetopiaERP
BetopiaERP_LOG_FILE=$BetopiaERP_LOG_DIR/BetopiaERP-server.log
BetopiaERP_USER="BetopiaERP"

if ! getent passwd | grep -q "^BetopiaERP:"; then
    groupadd $BetopiaERP_GROUP
    adduser --system --no-create-home $BetopiaERP_USER -g $BetopiaERP_GROUP
fi
# Register "$BetopiaERP_USER" as a postgres user with "Create DB" role attribute
su - postgres -c "createuser -d -R -S $BetopiaERP_USER" 2> /dev/null || true
# Configuration file
mkdir -p $BetopiaERP_CONFIGURATION_DIR
# can't copy debian config-file as addons_path is not the same
if [ ! -f $BetopiaERP_CONFIGURATION_FILE ]
then
    echo "[options]
; This is the password that allows database operations:
; admin_passwd = admin
db_host = False
db_port = False
db_user = $BetopiaERP_USER
db_password = False
addons_path = %{python3_sitelib}/BetopiaERP/addons
default_productivity_apps = True
" > $BetopiaERP_CONFIGURATION_FILE
    chown $BetopiaERP_USER:$BetopiaERP_GROUP $BetopiaERP_CONFIGURATION_FILE
    chmod 0640 $BetopiaERP_CONFIGURATION_FILE
fi
# Log
mkdir -p $BetopiaERP_LOG_DIR
chown $BetopiaERP_USER:$BetopiaERP_GROUP $BetopiaERP_LOG_DIR
chmod 0750 $BetopiaERP_LOG_DIR
# Data dir
mkdir -p $BetopiaERP_DATA_DIR
chown $BetopiaERP_USER:$BetopiaERP_GROUP $BetopiaERP_DATA_DIR

INIT_FILE=/lib/systemd/system/BetopiaERP.service
touch $INIT_FILE
chmod 0700 $INIT_FILE
cat << EOF > $INIT_FILE
[Unit]
Description=BetopiaERP Open Source ERP and CRM
After=network.target

[Service]
Type=simple
User=BetopiaERP
Group=BetopiaERP
ExecStart=/usr/bin/BetopiaERP --config $BetopiaERP_CONFIGURATION_FILE --logfile $BetopiaERP_LOG_FILE
KillMode=mixed

[Install]
WantedBy=multi-user.target
EOF

%files
%{_bindir}/BetopiaERP
%{python3_sitelib}/%{name}-*.egg-info
%{python3_sitelib}/%{name}
%pycached %exclude %{python3_sitelib}/doc/cla/stats.py
%pycached %exclude %{python3_sitelib}/setup/*.py
%exclude %{python3_sitelib}/setup/BetopiaERP

%changelog
* %{build_date} Christophe Monniez <moc@BetopiaERP.com> - %{version}-%{release}
- Latest updates
