# SIT737-2025-prac6c
Enhanced Calculator Microservice deployment for SIT737-2025 Task 6.2C. Includes Kubernetes port-forward setup, browser access, application update with a new endpoint, Docker image versioning, and redeployment on Kubernetes.

# 🧮 Calculator Microservice – Kubernetes Deployment
This project demonstrates the deployment of a Dockerized Node.js calculator microservice onto a Kubernetes cluster as part of SIT737 Task 6.2C. It includes Kubernetes port-forward setup, browser access, application update with a new endpoint, Docker image versioning, and redeployment on Kubernetes.

# 🚀 Technologies Used

Node.js
Express.js
Docker
Docker Compose
Kubernetes

# ⚙️ Setup and Deployment Instructions

### 1. Clone the Repository

git clone https://github.com/DanishKumar1001/sit737-2025-prac6c
cd SIT737-2025-prac6c

## 1. Build and Push Docker Image

docker build -t calculator-microservice .
docker tag calculator-microservice your-dockerhub-username/calculator-microservice:latest
docker push your-dockerhub-username/calculator-microservice:latest

## 2. Deploy Application to Kubernetes

### Apply the Deployment:

kubectl apply -f deployment.yaml

### Apply the Service:

kubectl apply -f service.yaml

### Check status:

kubectl get deployments
kubectl get pods
kubectl get services

## 3. Access the Application

After deploying, access the application using:

http://localhost:<NodePort>/

## 4. Port-Forward to Access Locally

kubectl port-forward service/calculator-microservice 3000:80

## 5. Test API Endpoints

### 1. Addition

GET /add?num1=10&num2=5

### 2. Subtraction

GET /subtract?num1=10&num2=5
Returns error if num1 < num2.

### 3. Multiplication

GET /multiply?num1=10&num2=5

### 4. Division

GET /divide?num1=10&num2=5
Returns error if num2 == 0.

### 5. Exponentiation(Power)

GET /power?num1=2&num2=3

### 6. Modulo 

GET /modulo?num1=10&num2=3
Returns error if num2 == 0.

### 7. Square Root:

GET /sqrt?num1=16
Returns error if num1 is negative.

### 8. Percentage Calculator

GET /percentage?num1=50&num2=200

✅ You can test using a browser, curl, or Postman.

## 5. Error Testing

**Missing Parameters:** Returns 400 Bad Request
**Invalid Numbers:** Returns 400 Bad Request
**Subtraction Edge Case:** num1 must be greater than num2
**Division by Zero:** Not allowed
**Modulo by Zero:** Not allowed
**Square Root of Negative Number:** Not allowed
**Invalid Endpoint:** Returns 404 Not Found
**Zero Denominator for percentage:** Returns 400 Bad Request if num2 == 0.

# 📦 Files Description

    File	                      Purpose

Dockerfile	        Instructions to build the Docker image
docker-compose.yml	(Optional) Local multi-container setup with health check
deployment.yaml     Kubernetes Deployment configuration for pods
service.yaml	    Kubernetes Service configuration to expose pods
calculator.js	    Main Node.js application with RESTful API
package.json	    Project dependencies and metadata
package-lock.json	Locked versions of dependencies

#  Reference Links:

Docker - https://docs.docker.com/
Kubernetes - https://kubernetes.io/docs/home/