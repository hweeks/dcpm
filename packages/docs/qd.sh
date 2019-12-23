pip install mkdocs --user
mkdocs build
scp -r site/* centos@157.245.185.94:/home/centos/docs/static
