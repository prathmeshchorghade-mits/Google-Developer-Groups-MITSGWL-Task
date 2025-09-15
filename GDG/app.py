from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
import os

basedir = os.path.abspath(os.path.dirname(__file__))

# --- App & Database Configuration ---
app = Flask(__name__, template_folder='templates')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'groups.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Database Model ---
class StudyGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    start_time = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    max_students = db.Column(db.Integer, nullable=True)
    student_year = db.Column(db.String(50), nullable=True)
    student_branch = db.Column(db.String(100), nullable=True)
    current_students = db.Column(db.Integer, default=1)

    def to_dict(self):
        return {
            'id': self.id,
            'course_name': self.course_name,
            'location': self.location,
            'start_time': self.start_time,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'max_students': self.max_students,
            'student_year': self.student_year,
            'student_branch': self.student_branch,
            'current_students': self.current_students
        }

# --- HTML Page Routes ---
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/groups')
def view_groups_page():
    return render_template('view_groups.html')

@app.route('/post')
def post_group_page():
    return render_template('post_group.html')

# --- API Endpoints ---
@app.route('/api/groups', methods=['GET'])
def get_groups():
    groups = StudyGroup.query.order_by(StudyGroup.created_at.desc()).all()
    group_list = [group.to_dict() for group in groups]
    return jsonify(group_list)

@app.route('/api/groups', methods=['POST'])
def create_group():
    data = request.get_json()
    if not data or not 'course_name' in data or not 'location' in data:
        return jsonify({'error': 'Missing required fields'}), 400
    new_group = StudyGroup(
        course_name=data['course_name'],
        location=data['location'],
        start_time=data.get('start_time', ''),
        description=data.get('description', ''),
        max_students=data.get('max_students'),
        student_year=data.get('student_year', ''),
        student_branch=data.get('student_branch', '')
    )
    db.session.add(new_group)
    db.session.commit()
    return jsonify(new_group.to_dict()), 201

@app.route('/api/groups/<int:group_id>/join', methods=['POST'])
def join_group(group_id):
    group = StudyGroup.query.get(group_id)
    if group is None:
        return jsonify({'error': 'Group not found'}), 404
    if group.max_students and group.current_students >= group.max_students:
        return jsonify({'error': 'This study group is already full'}), 400
    group.current_students += 1
    db.session.commit()
    return jsonify(group.to_dict())

# --- Main Block ---
if __name__ == '__main__':
    with app.app_context():
        if not os.path.exists(os.path.join(basedir, 'instance')):
            os.makedirs(os.path.join(basedir, 'instance'))
        db.create_all()
    app.run(debug=True)