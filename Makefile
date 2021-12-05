all: run

run:
	ionic serve

deploy:
	ionic build
	ssh root@dansysadm.com mkdir -p /sites/dice.dansysadm.com/
	rsync -rvz --delete --progress --exclude=venv --exclude=__pycache__  --exclude=.git build/. root@dansysadm.com:/sites/dice.dansysadm.com/.

apk:
	cd android && JAVA_HOME=/opt/android-studio/jre/ ./gradlew assembleDebug

test:
	./node_modules/.bin/eslint src
