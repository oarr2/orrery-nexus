#will generate points at the origin 0,0
#x^2 + y^2 = r^2
import math
import csv

#radius of 2
r = 65
y = - r
data = [['x', 'y']]
data2 = []
while y <= r:
    x = math.sqrt(r*r - y*y)
    x = math.ceil(x * 10000)/10000
    data.append([x,y])
    if x != 0:
        data2.append([-x,y])
    y+=0.0008
    y = math.ceil(y * 10000)/10000
data2 = data2[::-1]
data = data + data2
print(data)
with open('mars_points.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)