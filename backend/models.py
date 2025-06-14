"""Simple in-memory data model used while the real DB is unavailable."""

from dataclasses import dataclass, field
from datetime import datetime
from typing import List


_posts: List["Post"] = []


@dataclass
class Post:
    content: str
    id: int = field(init=False)
    created_at: datetime = field(default_factory=datetime.utcnow)

    # Auto-incrementing ID counter shared among posts
    _next_id: int = 1

    def __post_init__(self):
        self.id = Post._next_id
        Post._next_id += 1

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
        }


def add_post(post: Post) -> None:
    """Store a post in the in-memory list."""
    _posts.append(post)


def get_posts() -> List[Post]:
    """Return posts ordered by creation time descending."""
    return list(reversed(_posts))
