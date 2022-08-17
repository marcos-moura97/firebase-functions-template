# Template Firebase Functions

Template to firebase functions that performs CRUD in RealTimeDatabase.



## Template RealtimeDatabase
This template assume two fields: User and Item, with this structure:

```
-/users
--${user1_id}
-----name: string;
-----email: string;
-----phone: number;
-----creationTime: number;
-----address:
--------cep: string;
--------complement: string;
--------description: string;
--------number: string;
--${user2_id}
-----name: string;
-----email: string;
-----phone: number;
-----creationTime: number;
-----address:
--------cep: string;
--------complement: string;
--------description: string;
--------number: string;
...
-/itens
--${user1_id}
-----${item1_id}
--------userId: string;
--------title: string;
--------category: string;
--------available: boolean;
--------photo?: Object;
--------creationTime: number;
-----${item2_id}
--------userId: string;
--------title: string;
--------category: string;
--------available: boolean;
--------photo?: Object;
--------creationTime: number;

--${user2_id}
-----${item1_id}
--------userId: string;
--------title: string;
--------category: string;
--------available: boolean;
--------photo?: Object;
--------creationTime: number;
...

```
