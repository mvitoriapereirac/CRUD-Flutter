class Item {
  final String id;
  final String name;

  Item({required this.id, required this.name});

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(id: json['id'], name: json['name']);
  }
}