#!/usr/bin/env python3
###############
#             #
#   ( )   _   #
#  (_` )_('>  #
#  (__,~_)8   #
#    _YY_     #
###############
# Author: takenX10 
# N.B. This is spagetti code written the day before the exam
# It is likely not bug proof, so don't get mad at me if something doesn't work
# or if you don't like the style of the code, it is what it is.
# If you really want to make it better, even though it is completely useless, just make a pr.

helptext = """

   ( )   _   
  (_` )_('>  
  (__,~_)8   
    _YY_     
Author: takenX10

Welcome to the dijkstra solver, in order to use this program you should compile the file "dijkstra-dist.txt" with your graph:
- In the first line you insert the list of nodes, divided by a comma, like this:
A,R1,R2,R3,R4,R5,R6,R7,R8,R9,B
- In the second line you insert the node where you start
- In the third line you insert the node you want to reach
- From the fourth line on, you should insert all the weights like this (it is supposed to be an unoriented graph):
  "FIRSTNODE SECONDNODE WEIGHT"

Happy graph solving :)<3

"""
import sys
inf = 10000000000000

# Find minimum node to visit
def findmin(s, d, v):
    if(len(d) == len(v)):
        return None
    min = inf + 1
    next = s
    for key, val in d.items():
        if(val<min and key not in v):
            min = val
            next = key
    return next

# Print the current line of progress of the distance vector
def printline(d, p, v):
    for key, val in d.items():
        if(key in v):
            print(f"       |", end="")
        else:
            text = " ---" if val == inf else f"{p[key]},{str(val)}"
            length = len(f" {text}")
            print(f" {text}{' ' * (7-length)}|", end="")
    print("\n" + ("-" * len(d) * 8) + "\n")

# Print the shortest path
def printshortest(s, c, p):
    if(c == s):
        print(s, end="->")
    else:
        printshortest(s, p[c], p)
        print(c, end="->")

def main():
    print(len(sys.argv))
    if len(sys.argv) > 1:
        if sys.argv[1] == "--help" or sys.argv[1] == "-h":
            print(helptext)
            exit()
    ### Initialization
    lines = []
    with open("dijkstra-dist.txt", "r") as f:
        lines = f.read()
    lines = lines.split("\n")
    start = lines[1]
    end = lines[2]
    nodes = lines[0].split(",")
    lines = lines[3:]
    infdist = {}
    for n in nodes:
        infdist[n] = inf
    weight = {}
    distance = {}
    previous = {}
    for n in nodes:
        infdist = {}
        for m in nodes:
            infdist[m] = inf
        weight[n] = infdist
        previous[n] = start
        distance[n] = inf
    for l in lines:
        l = l.split(" ")
        weight[l[0]][l[1]] = int(l[2])
        weight[l[1]][l[0]] = int(l[2])

    ### Print nodes
    print()
    for n in nodes:
        length = len(n)
        print(f" {n}{' ' * (6-length)}|", end="")
    print("\n" + ("-" * len(nodes) * 8) + "\n")

    ### Algorithm (BTW this is very inefficient, but no one cares)
    distance[start] = 0
    visited = []
    while(True):
        minnode = findmin(start, distance, visited)
        if(not minnode):
            break
        visited.append(minnode)
        for n in nodes:
            if(distance[minnode] + weight[minnode][n] < distance[n]):
                distance[n] = distance[minnode] + weight[minnode][n]
                previous[n] = minnode
        printline(distance, previous, visited)
    printshortest(start, end, previous)
    print(f"\nweight: {distance[end]}")

if __name__ == "__main__":
    main()