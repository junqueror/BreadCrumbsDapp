# Global vars
USER = junqueror
APP = breadcrumbs
DIRECTORY = ${APP}
GCLOUD_USER = pmjunquera
GCLOUD_PROJECT = breadcrumbs-345213
GCLOUD_REPOSITORY = breadcrumbs
GCLOUD_HOST = 34.78.61.132
GCLOUD_VM = production

# Argument vars
ENV = local

# Environment vars
include ./.env.${ENV}
export

# Other vars

ifeq ($(ENV), local)
BLOCKCHAIN_NETWORK = development
else ifeq ($(ENV), development)
BLOCKCHAIN_NETWORK = testnet
else ifeq ($(ENV), production)
# BLOCKCHAIN_NETWORK = bsc
BLOCKCHAIN_NETWORK = testnet # TODO: Change to bsc
else
BLOCKCHAIN_NETWORK = development
endif

# Local

truffle-compile:
	cd backend && truffle compile

truffle-migrate:
	cd backend && truffle migrate --network $(BLOCKCHAIN_NETWORK)

truffle-console:
	cd backend && truffle console --network $(BLOCKCHAIN_NETWORK)

# Clean docker

docker-clean:
	-docker rm -f $$(docker ps -a -q)
	-docker rmi -f $$(docker images | grep ${GCLOUD_REPOSITORY})
	-docker rmi -f $$(docker images | grep '<none>')

docker-prune:
	@echo This will clean all Docker environment as installation default. All data store in volumes will be lost.
	@echo "Are you sure you want to reset Docker environment? [y/N] " && read ans && [ $${ans:-N} = y ]
	-docker rm -f $$(docker ps -a -q)
	-docker rmi -f $$(docker images -q)
	-docker system prune -f --volumes
	-docker volume prune -f
	-docker image prune -f

docker-rm-volumes:
	docker volume rm -f $(ENV)_database-volume $(ENV)_elasticsearch-volume $(ENV)_media-volume $(ENV)_redis_volume $(ENV)_static-volume

# Deploy on Docker

docker-build:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml build

docker-up-dev:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml rm -s -v -f
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml up truffle pgadmin

docker-up:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml up -d

docker-test:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml up truffle-test

docker-down:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml down

docker-push:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml push

docker-pull:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml pull


# Google Cloud platform

gcloud-set-config:
	gcloud config set project ${GCLOUD_PROJECT}
	gcloud config set artifacts/repository ${GCLOUD_REPOSITORY}
	gcloud config set artifacts/location europe-west1
	$(MAKE) gcloud-set-auth-docker

gcloud-set-auth:
	gcloud auth configure-docker europe-west1-docker.pkg.dev

gcloud-list-artifacts:
	gcloud artifacts packages list

gcloud-ssh:
	gcloud compute ssh $(GCLOUD_USER)@$(GCLOUD_VM)

gcloud-scp-push:
	@echo
	@echo Copying file to 'production' instance in Google Cloud:
	@echo
	gcloud compute scp --recurse $(PWD)/$(FILE) $(GCLOUD_USER)@$(GCLOUD_VM):/home/$(GCLOUD_USER)/$(APP)/$(FILE)
	@echo

gcloud-scp-pull:
	@echo
	@echo Copying file from 'production' instance in Google Cloud:
	@echo
	gcloud compute  scp --recurse $(GCLOUD_USER)@$(GCLOUD_VM):/home/$(GCLOUD_USER)/$(APP)/$(FILE) $(PWD)/$(FILE)
	@echo