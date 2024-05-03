Cloud
1) 	Server (File yaat aahe)
	1)sudo apt install net-tools
	2)ifconfig -->> inet line 2
	3)sudo apt install ssh
	4) sudo systemctl start ssh
	5)sudo systemcrl status ssh
	6) scp myfile.txt (reciver_usernname)@(reciever_ip):/download/

	password of reciver

2)  jyala file denar
	ipconfig



2) Aws Amplify
Id :- psudarshan494@gmail.com
Pass :- Pms$@2002

Github:- Viraj324
Pass:-sjpv@5555

## VM 1

      username:vagrant
      password:vagrant

      ifconfig // note inet address

## VM 2

      username:vagrant
      password:vagrant

      ifconfig // note inet address

## VM 1

      ping <ip of vm2>
      touch transfer.txt
      nano transfer.txt
      //write content->Press Ctr X -> Y -> Enter
      cat transfer.txt
      scp transfer.txt vagrant@<ip of 2nd vm>:/home/vagrant

## VM 2

      ls //to see the transfered file from vm1

### Note: If command ifconfig is not found then

      sudo apt install net-tools
