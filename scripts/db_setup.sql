# Setup
use mysql;
create schema widgets;
use widgets;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'gumshoetoadstool';
GRANT ALL PRIVILEGES ON widgets.* TO 'appuser'@'localhost' WITH GRANT OPTION;
# End setup