#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail
# set -o xtrace

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"

# Recommends: antiword, graphviz, ghostscript, python-gevent, poppler-utils
export DEBIAN_FRONTEND=noninteractive

# single-user mode, appropriate for chroot environment
# explicitly setting the runlevel prevents warnings after installing packages
export RUNLEVEL=1

# Unset lang variables to prevent locale settings leaking from host
unset "${!LC_@}"
unset "${!LANG@}"

# set locale to en_US
echo "set locale to en_US"
echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
dpkg-reconfigure locales

# Aliases
echo  "alias ll='ls -al'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias BetopiaERP='sudo systemctl stop BetopiaERP; sudo -u BetopiaERP /usr/bin/python3 /home/pi/BetopiaERP/BetopiaERP-bin --config /home/pi/BetopiaERP.conf'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias BetopiaERP_logs='less -R +F /var/log/BetopiaERP/BetopiaERP-server.log'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias BetopiaERP_conf='cat /home/pi/BetopiaERP.conf'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias install='sudo chroot /root_bypass_ramdisks/'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias blackbox='ls /dev/serial/by-path/'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias nano='sudo -u BetopiaERP nano -l'" | tee -a /home/pi/.bashrc
echo  "alias vim='sudo -u BetopiaERP vim -u /home/pi/.vimrc'" | tee -a /home/pi/.bashrc
echo  "alias BetopiaERP_luxe='printf \" ______\n< Luxe >\n ------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\ \n                ||----w |\n                ||     ||\n\"'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias BetopiaERP_start='sudo systemctl start BetopiaERP'" >> /home/pi/.bashrc
echo  "alias BetopiaERP_stop='sudo systemctl stop BetopiaERP'" >> /home/pi/.bashrc
echo  "alias BetopiaERP_restart='sudo systemctl restart BetopiaERP'" >> /home/pi/.bashrc
echo "
BetopiaERP_help() {
  echo '-------------------------------'
  echo ' Welcome to BetopiaERP IoT Box tools'
  echo '-------------------------------'
  echo ''
  echo 'BetopiaERP                  Starts/Restarts BetopiaERP server manually (not through BetopiaERP.service)'
  echo 'BetopiaERP_logs             Displays BetopiaERP server logs in real time'
  echo 'BetopiaERP_conf             Displays BetopiaERP configuration file content'
  echo 'install               Bypasses ramdisks to allow package installation'
  echo 'blackbox              Lists all serial connected devices'
  echo 'BetopiaERP_start            Starts BetopiaERP service'
  echo 'BetopiaERP_stop             Stops BetopiaERP service'
  echo 'BetopiaERP_restart          Restarts BetopiaERP service'
  echo 'BetopiaERP_dev <branch>     Resets BetopiaERP on the specified branch from BetopiaERP-dev repository'
  echo 'BetopiaERP_origin <branch>  Resets BetopiaERP on the specified branch from the BetopiaERP repository'
  echo 'devtools              Enables/Disables specific functions for development (more help with devtools help)'
  echo ''
  echo 'BetopiaERP IoT online help: <https://www.BetopiaERP.com/documentation/latest/applications/general/iot.html>'
}

BetopiaERP_dev() {
  if [ -z \"\$1\" ]; then
    BetopiaERP_help
    return
  fi
  pwd=\$(pwd)
  cd /home/pi/BetopiaERP
  sudo -u BetopiaERP git remote add dev https://github.com/BetopiaERP-dev/BetopiaERP.git
  sudo -u BetopiaERP git fetch dev \$1 --depth=1 --prune
  sudo -u BetopiaERP git reset --hard FETCH_HEAD
  sudo -u BetopiaERP git branch -m \$1
  sudo chroot /root_bypass_ramdisks /bin/bash -c \"export DEBIAN_FRONTEND=noninteractive && xargs apt-get -y -o Dpkg::Options::=\"--force-confdef\" -o Dpkg::Options::=\"--force-confold\" install < /home/pi/BetopiaERP/addons/iot_box_image/configuration/packages.txt\"
  sudo -u BetopiaERP pip3 install -r /home/pi/BetopiaERP/addons/iot_box_image/configuration/requirements.txt --break-system-package
  cd \$pwd
}

BetopiaERP_origin() {
  if [ -z \"\$1\" ]; then
    BetopiaERP_help
    return
  fi
  pwd=\$(pwd)
  cd /home/pi/BetopiaERP
  sudo -u BetopiaERP git remote set-url origin https://github.com/BetopiaERP/BetopiaERP.git  # ensure BetopiaERP repository
  sudo -u BetopiaERP git fetch origin \$1 --depth=1 --prune
  sudo -u BetopiaERP git reset --hard FETCH_HEAD
  sudo -u BetopiaERP git branch -m \$1
  sudo chroot /root_bypass_ramdisks /bin/bash -c \"export DEBIAN_FRONTEND=noninteractive && xargs apt-get -y -o Dpkg::Options::=\"--force-confdef\" -o Dpkg::Options::=\"--force-confold\" install < /home/pi/BetopiaERP/addons/iot_box_image/configuration/packages.txt\"
  sudo -u BetopiaERP pip3 install -r /home/pi/BetopiaERP/addons/iot_box_image/configuration/requirements.txt --break-system-package
  cd \$pwd
}

pip() {
  if [[ -z \"\$1\" || -z \"\$2\" ]]; then
    BetopiaERP_help
    return 1
  fi
  additional_arg=\"\"
  if [ \"\$1\" == \"install\" ]; then
    additional_arg=\"--user\"
  fi
  pip3 \"\$1\" \"\$2\" --break-system-package \$additional_arg
}

devtools() {
  help_message() {
    echo 'Usage: devtools <enable/disable> <general/actions> [action name]'
    echo ''
    echo 'Only provide an action name if you want to enable/disable a specific device action.'
    echo 'If no action name is provided, all actions will be enabled/disabled.'
    echo 'To enable/disable multiple actions, enclose them in quotes separated by commas.'
  }
  case \"\$1\" in
    enable|disable)
      case \"\$2\" in
        general|actions|longpolling)
          if ! grep -q '^\[devtools\]' /home/pi/BetopiaERP.conf; then
            sudo -u BetopiaERP bash -c \"printf '\n[devtools]\n' >> /home/pi/BetopiaERP.conf\"
          fi
          if [ \"\$1\" == \"disable\" ]; then
            value=\"\${3:-*}\" # Default to '*' if no action name is provided
            devtools enable \"\$2\" # Remove action/general/longpolling from conf to avoid duplicate keys
            sudo sed -i \"/^\[devtools\]/a\\\\\$2 = \$value\" /home/pi/BetopiaERP.conf
          elif [ \"\$1\" == \"enable\" ]; then
            sudo sed -i \"/\[devtools\]/,/\[/{/\$2 =/d}\" /home/pi/BetopiaERP.conf
          fi
          ;;
        *)
          help_message
          return 1
          ;;
      esac
      ;;
    *)
      help_message
      return 1
      ;;
  esac
}
" | tee -a ~/.bashrc /home/pi/.bashrc

# Change default hostname from 'raspberrypi' to 'iotbox'
echo iotbox | tee /etc/hostname
sed -i 's/\braspberrypi/iotbox/g' /etc/hosts

apt-get update

# At the first start it is necessary to configure a password
# This will be modified by a unique password on the first start of BetopiaERP
password="$(openssl rand -base64 12)"
echo "pi:${password}" | chpasswd
echo TrustedUserCAKeys /etc/ssh/ca.pub >> /etc/ssh/sshd_config

# Prevent Wi-Fi blocking
apt-get -y remove rfkill

echo "Acquire::Retries "16";" > /etc/apt/apt.conf.d/99acquire-retries
# KEEP OWN CONFIG FILES DURING PACKAGE CONFIGURATION
# http://serverfault.com/questions/259226/automatically-keep-current-version-of-config-files-when-apt-get-install
xargs apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" install < /home/pi/BetopiaERP/addons/iot_box_image/configuration/packages.txt
apt-get -y autoremove

apt-get clean
localepurge
rm -rfv /usr/share/doc

# Remove the default nginx website, we have our own config in /etc/nginx/conf.d/
rm /etc/nginx/sites-enabled/default

pip3 install -r /home/pi/BetopiaERP/addons/iot_box_image/configuration/requirements.txt --break-system-package

# Create BetopiaERP user for BetopiaERP service and disable password login
adduser --disabled-password --gecos "" --shell /usr/sbin/nologin BetopiaERP

# BetopiaERP user doesn't need to type its password to run sudo commands
cp /etc/sudoers.d/010_pi-nopasswd /etc/sudoers.d/010_BetopiaERP-nopasswd
sed -i 's/pi/BetopiaERP/g' /etc/sudoers.d/010_BetopiaERP-nopasswd

# copy the BetopiaERP.conf file to the overwrite directory
mv -v "/home/pi/BetopiaERP/addons/iot_box_image/configuration/BetopiaERP.conf" "/home/pi/"
chown BetopiaERP:BetopiaERP "/home/pi/BetopiaERP.conf"

groupadd usbusers
usermod -a -G usbusers BetopiaERP
usermod -a -G video BetopiaERP
usermod -a -G render BetopiaERP
usermod -a -G lp BetopiaERP
usermod -a -G input BetopiaERP
usermod -a -G dialout BetopiaERP
usermod -a -G pi BetopiaERP
mkdir -v /var/log/BetopiaERP
chown BetopiaERP:BetopiaERP /var/log/BetopiaERP
chown BetopiaERP:BetopiaERP -R /home/pi/BetopiaERP/

# logrotate is very picky when it comes to file permissions
chown -R root:root /etc/logrotate.d/
chmod -R 644 /etc/logrotate.d/
chown root:root /etc/logrotate.conf
chmod 644 /etc/logrotate.conf

update-rc.d -f hostapd remove
update-rc.d -f nginx remove
update-rc.d -f dnsmasq remove

systemctl enable ramdisks.service
systemctl disable dphys-swapfile.service
systemctl enable ssh
systemctl set-default graphical.target
systemctl disable getty@tty1.service
systemctl disable systemd-timesyncd.service
systemctl unmask hostapd.service
systemctl disable hostapd.service
systemctl disable cups-browsed.service
systemctl enable labwc.service
systemctl enable BetopiaERP.service
systemctl enable BetopiaERP-led-manager.service
systemctl enable BetopiaERP-ngrok.service

# create dirs for ramdisks
create_ramdisk_dir () {
    mkdir -v "${1}_ram"
}

create_ramdisk_dir "/var"
create_ramdisk_dir "/etc"
create_ramdisk_dir "/tmp"
mkdir -v /root_bypass_ramdisks

echo ""
echo "--- DEFAULT PASSWORD: ${password} ---"
echo ""
