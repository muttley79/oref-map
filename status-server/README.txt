How to install cloudflare tunnel (cloudflared) on proxy machine
===============================================================
curl -L https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update

sudo apt install cloudflared
cloudflared tunnel login
cloudflared tunnel create orefproxy8

mkdir -p ~/.cloudflared
cat > ~/.cloudflared/config.yml << 'EOF'
tunnel: orefproxy8
credentials-file: ~/.cloudflared/....json

ingress:
  - hostname: orefproxy8.oref-map.org
    service: http://localhost:3001
  - service: http_status:404

cloudflared tunnel route dns orefproxy8 orefproxy8.oref-map.org
cloudflared tunnel run orefproxy8

sudo vi /etc/sysctl.d/30-cloudflared.conf
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
