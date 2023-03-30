# nginx-main
upstream app_servers {
  server 서브 인스턴스1:80 max_fails=1 fail_timeout=10s;
  server 서브 인스턴스2:80 max_fails=1 fail_timeout=10s;
}

server {
  listen 80;
  server_name 메인 인스턴스;

  location / {
    proxy_pass http://app_servers;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_next_upstream error timeout http_502 http_503 http_504;
  }
}
이런식으로 구성하면 메인 인스턴스로 클라이언트가 요청을 했을 때, 1차 로드밸런싱이 일어나서 서브 인스턴스 1 또는 2 중에서 부하가 덜 일어나는 쪽으로 커넥팅을 해줌.
그리고나서 커넥팅 된 인스턴스 내부에서 내부포트로 2차 로드밸런싱이 일어나면서 서버의 과부화를 줄일 수 있게 됨.
