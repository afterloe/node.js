.ONESHELL:
result.txt: source.txt
	more source.txt > result.txt
	rm -rf source.txt
source.txt:
	ps aux | grep afterloe > source.txt
.PHONY: clean
clean: source.txt result.txt
	rm source.txt
