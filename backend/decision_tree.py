from sklearn import tree
import sys
import json

input_data = sys.argv[1]
input_data2 = sys.argv[2]
input_data3 = sys.argv[3]

# Dữ liệu huấn luyện
features = json.loads(input_data)

# features = [[13, 14], [13, 14], [10, 12], [9, 14], [19, 21], [15, 18]]
labels = json.loads(input_data2)

# Tạo cây quyết định
clf = tree.DecisionTreeClassifier()
clf = clf.fit(features, labels)

# Dự đoán lớp học dựa trên thời gian
new_input = json.loads(input_data3)  # Thời gian 06:00 - 09:00
prediction = clf.predict(new_input)

print(prediction[0])
