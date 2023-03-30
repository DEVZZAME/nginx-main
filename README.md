```jsx
upstream server_name {
	server 서브 인스턴스1:80;
	server 서브 인스턴스2:80;
}
server {
	listen 80;
	server_name 메인 인스턴스;

	location / {
		proxy_pass http://server_name;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
```

```jsx
upstream server_name {
	ip_hash;
	server 127.0.0.1:3006;
	server 127.0.0.1:3007;
	server 127.0.0.1:3008;
}

server {
	listen 80;
	server_name 서브 인스턴스;

	location / {
		proxy_pass http://server_name;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
```

- 이런식으로 구성하면 메인 인스턴스로 클라이언트가 요청을 했을 때, 1차 로드밸런싱이 일어나서 서브 인스턴스 1 또는 2 중에서 부하가 덜 일어나는 쪽으로 커넥팅을 해줌. 그리고나서 커넥팅 된 인스턴스 내부에서 내부포트로 2차 로드밸런싱이 일어나면서 서버의 과부화를 줄일 수 있게 됨.
- 로드밸런싱 같은 경우는 nginx 뿐만 아니라 성능 좋은 AWS L4나 L7도 고려할 수 있지만, 서버 규모가 일정 수준으로 커지지 않아서 아직까지는 nginx로 버틸만 함.
